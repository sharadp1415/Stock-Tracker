
#from information import client_id
import requests
import numpy as np
import pandas as pd
from datetime import datetime
import random
# For visualizations
import plotly.graph_objects as go
import matplotlib.pyplot as plt
# For time series modeling
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.arima.model import ARIMA
import yfinance as yf
import statistics

dataframe = yf.download('GOOG', '2021-01-21', '2022-04-20')
dataObama = yf.download('GOOG', '2009-01-20', '2017-01-21')
dataForFindingImmediateGrowth = yf.download("GOOG", '2020-10-30', '2020-11-06')
tickerInfoForRecs = yf.Ticker("GOOG")

dailyIncrease = 1 + ((dataObama.iloc[len(dataObama)-1]['Close'] - dataObama.iloc[0]
                     ['Close']) / (dataObama.iloc[0]['Close'])) / (len(dataObama))


def calc_return(dataframe, lag=1):
    """
    Adds a column of the previous close to the dataframe. Lag is a user-input parameter.
    """
    prevClose = [x for x in dataframe['Close'][:-lag]]
    prevClose = [np.nan for i in range(lag)] + prevClose
    dataframe[f'{lag}-day prevClose'] = prevClose
    dataframe['return'] = np.log(dataframe[f'{lag}-day prevClose']).diff()

    return dataframe


calc_return(dataframe, lag=1)


def mean_std(dataframe, length=20):
    """
    Adds 2 columns to our dataframe: A rolling mean and standard deviations of user-defined lengths
    """
    dataframe[f'sma{length}'] = dataframe['return'].rolling(length).mean()
    dataframe[f'std{length}'] = dataframe['return'].rolling(length).std()
    # Remove leading NaNs
    dataframe.dropna(inplace=True)


mean_std(dataframe)


def main():
    dftest = sm.tsa.adfuller(dataframe['return'], autolag='AIC')
    dfoutput = pd.Series(dftest[0:4], index=[
                         'Test Statistic', 'p-value', '#Lags Used', 'Number of Observation Used'])
    for key, value in dftest[4].items():
        dfoutput['Critical Value ({0})'.format(key)] = value

    ar1 = ARIMA(tuple(dataframe['return']), (6, 6)).fit()
    ar1.summary()

    # Generate predictions
    preds = ar1.fittedvalues

    # Add predictions to our dataframe
    dataframe['predictions'] = dataframe[dataframe.columns[1]] * (1 + preds)

    steps = 63

    # Define forecast array for 2 days into the future
    # forecast = ar1.forecast(steps=steps)[0]
    # forecast1 = dataframe['Close'][-1] * (1 + forecast[0])
    # forecast2 = forecast1 * (1 + forecast[1])
    # forecast_array = np.array([forecast1, forecast2])

    forecast = ar1.forecast(steps=steps)[0]
    prevForecast = dataframe['Close'][-1] * (1 + forecast[0])
    forecast_array = [prevForecast]
    for i in range(steps-1):
        currForecast = prevForecast * (1 + forecast[i])
        prevForecast = currForecast
        forecast_array.append(currForecast)

    forecastBidenANDObama = np.array(forecast_array)*dailyIncrease

    mean_forecast_array = np.mean(
        [forecast_array, forecastBidenANDObama], axis=0)

    noise = np.random.normal(0, 50, 63)
    plt.figure(figsize=(16, 8))
    fc = pd.Series(mean_forecast_array + noise, index=pd.date_range(
        pd.DataFrame(dataframe.iloc[len(dataframe)-1]).columns[0], periods=63).tolist())
    oldValues = fc.to_list()
    newValues = dataframe['Close'][-200:].to_list()
    # plt.plot(fc)
    # plt.plot(dataframe['Close'][-200:])
    # plt.savefig("STATIC/test.png")

    immediateIncrease = ((dataForFindingImmediateGrowth.iloc[len(
        dataForFindingImmediateGrowth)-1]['Close'] - dataForFindingImmediateGrowth.iloc[0]['Close']) / (dataForFindingImmediateGrowth.iloc[0]['Close']))
    immediateIncrease = immediateIncrease*100
    overallImmediateIncrease = "{}immediate percent increase from Biden becoming President seen in a week (short term)".format(
        immediateIncrease)

    longTermIncrease = ((dataframe.iloc[len(
        dataframe)-1]['Close'] - dataframe.iloc[0]['Close']) / (dataframe.iloc[0]['Close']))
    longTermIncrease = longTermIncrease * 100
    overallBidenIncrease = "{} overall percent increase during Biden presidency (long term)".format(
        longTermIncrease)

    maxTermIncrease = (dataframe['Close'].max(
    ) - dataframe.iloc[0]['Close']) / (dataframe.iloc[0]['Close'])
    maxTermIncrease = maxTermIncrease * 100
    bidenIncrease = "{} percent increase seen at peak during Biden presidency (long term)".format(
        maxTermIncrease)

    obamaTermIncrease = (dataObama.iloc[len(
        dataObama)-1]['Close'] - dataObama.iloc[0]['Close']) / (dataObama.iloc[0]['Close'])
    obamaTermIncrease = obamaTermIncrease * 100
    obamaIncrease = "{} percent increase seen during course of Obama presidency (long term)".format(
        obamaTermIncrease)

    recs = tickerInfoForRecs.recommendations

    recObama = recs.copy().reset_index()
    recObama = recObama[recObama['Date'] <= '2017-01-19 12:54:43']

    recBiden = recs.copy().reset_index()
    recBiden = recBiden[recBiden['Date'] > '2021-01-15 10:34:45']

    countsOfGradeObama = pd.DataFrame(recObama.groupby(
        'To Grade').count()['Firm']).reset_index()
    totalCountObama = sum(countsOfGradeObama['Firm'])
    countsOfGoodObama = countsOfGradeObama[(countsOfGradeObama['To Grade'] == 'Buy') | (
        countsOfGradeObama['To Grade'] == 'Outperform') | (countsOfGradeObama['To Grade'] == 'Overweight')]
    sumOfGoodObama = sum(countsOfGoodObama['Firm'])

    countsOfGradeBiden = pd.DataFrame(recBiden.groupby(
        'To Grade').count()['Firm']).reset_index()
    totalCountBiden = sum(countsOfGradeObama['Firm'])
    countsOfGoodBiden = countsOfGradeBiden[(countsOfGradeBiden['To Grade'] == 'Buy') | (
        countsOfGradeBiden['To Grade'] == 'Outperform') | (countsOfGradeBiden['To Grade'] == 'Overweight')]
    sumOfGoodBiden = sum(countsOfGoodBiden['Firm'])

    obamaPerform = "{}- percent of Buy/Overweight/Market Outperform ratings during Obama Presidency.".format(
        100*sumOfGoodObama / totalCountObama)
    bidenPerform = "{}- percent of Buy/Overweight/Market Outperform ratings during Biden Presidency so far.".format(
        100*sumOfGoodBiden / totalCountBiden)

    # oldvalues = old data, newValues (noised up predictions)
    return oldValues, newValues, obamaPerform, bidenPerform, obamaIncrease, bidenIncrease, overallBidenIncrease, overallImmediateIncrease


main()
