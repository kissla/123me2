// NOTE: aepdutystationplans don't have start dates yet.

const maximoTours = {
  getUpdatedTours: () => {
    const now = new Date();
    // setMinutes mutates the object
    const fifteenMinutesInPast = new Date().setMinutes(now.getMinutes() - 15);
    const fortyFiveMinutesInPast = new Date().setMinutes(now.getMinutes() - 45);
    const fifteenMinutesInFuture = new Date().setMinutes(now.getMinutes() + 15);
    const fortyFiveMinutesInFuture = new Date().setMinutes(now.getMinutes() + 45);
    const tours = {
      member: [{
        stationid: 'Tour When Server Started',
        _rowstamp: '5417039',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Fahey Duty Station Plan',
        startDate: new Date().toISOString()
      }, {
        stationid: 'Tour with Unix Epoc',
        _rowstamp: '2',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Fahey Duty Station Plan',
        startDate: '1441843200'
      }, {
        stationid: 'Tour from January 2014 (Past)',
        _rowstamp: '3',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Fahey Duty Station Plan',
        startDate: '2014-01-02'
      }, {
        stationid: 'Tour In the Far Future',
        _rowstamp: '3',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Fahey Duty Station Plan',
        startDate: '3020-04-18T22:01:00+00:00'
      }, {
        stationid: '15MinutesinFuture',
        _rowstamp: '4',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Details of 15 Minutes in the Future Tour',
        startDate: fifteenMinutesInFuture
      }, {
        stationid: '45 Minutes in Future',
        _rowstamp: '5',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Details of 5 Minutes in the Future Tour',
        startDate: fortyFiveMinutesInFuture
      }, {
        stationid: '15 Minutes in Past',
        _rowstamp: '6',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Details of 15 Minutes in the Past Tour',
        startDate: fifteenMinutesInPast
      }, {
        stationid: '45 Minutes in Past',
        _rowstamp: '7',
        status_description: 'Active',
        status: 'ACTIVE',
        description: 'Details of 45 Minutes in the Past Tour',
        startDate: fortyFiveMinutesInPast
      }],
      responseInfo: {
        href: 'http://localhost/maximo/oslc/os/aepdutystationplans?oslc.select=stationid,description,status&lean=1'
      },
      href: 'http://localhost/maximo/oslc/os/aepdutystationplans'
    };

    return tours;
  }
};

module.exports = maximoTours;
