# We will write a filter manager
# two types of filters
""""
Complex filters: have multiple dates stored as a list

Non-Complex filters: have multiple dates not stored as a list

All filters are stored in an overraching dict

"""

from datetime import date


class filter_manager:
    # constructor
    def __init__(self):
        self.list_of_filters = {}

    # add a filter with a single tuple with start and end date
    def add_filters(self, name, start, end):
        self.list_of_filters[name] = (start, end)

    # add a complex filter by passing in a list of tuples, each tuple has a start and end date
    def add_complex_filter(self, name, list_of_dates):
        self.list_of_filters[name] = list_of_dates

    # return start and end date for the non complex filters
    def query(self, name):
        return self.list_of_filters[name][0], self.list_of_filters[name][1]

    # complex queries need to be handled on the model end
    def complex_query(self, name):
        return self.list_of_filters[name]

    # check if a filter is complex
    def isComplex(self, name):
        if type(self.list_of_filters[name]) == list:
            return True
        else:
            return False

    # utility function to show available filters
    def get_filters(self):
        return self.list_of_filters.keys()

# main method for testing


def main():
    filter = filter_manager()
    START = "2015-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")
    filter.add_filters("test", START, TODAY)
    filter.add_complex_filter(
        "test_2", [("2016-07-10", "2020-04-06"), ("2019-05-07", "2020-02-06")])
    print(filter.get_filters())
    print(type(filter.complex_query("test_2")))
    print(filter.isComplex("test"))


main()
