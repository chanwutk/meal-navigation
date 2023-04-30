import {Store} from '../types';

export const stores: {
  [name: string]: Store[];
} = {
  'Whole Food': [
    {
      brand: 'Whole Food',
      address: '3000 Telegraph Ave, Berkeley, CA 94705',
      phone: '(510) 649-1333',
      time: '08:00-21:00',
      location: [37.855577, -122.260054],
    },
    {
      brand: 'Whole Food',
      address: '5110 Telegraph Ave, Oakland, CA 94609',
      phone: '(510) 903-2222',
      time: '08:00-21:00',
      location: [37.837657, -122.262078],
    },
    {
      brand: 'Whole Food',
      address: '1025 Gilman St, Berkeley, CA 94710',
      phone: '(510) 809-8293',
      time: '08:00-22:00',
      location: [37.880569, -122.297177],
    },
    // {"address": "230 Bay Pl, Oakland, CA 94612",
    // "phone": "(510) 834-9800",
    // "time": "08:00-22:00"
    // },
    // {"address": "3502 Mt Diablo Blvd, Lafayette, CA 94549",
    // "phone": "(925) 284-5305",
    // "time": "08:00-21:00"
    // },
    // {"address": "399 4th St, San Francisco, CA 94107",
    // "phone": "(415) 618-0066",
    // "time": "08:00-22:00"
    // }
  ],
  "Trader Joe's": [
    {
      brand: "Trader Joe's",
      address: '5727 College Ave, Oakland, CA 94618',
      phone: '(510) 923-9428',
      time: '08:00-21:00',
      location: [37.845923, -122.252565],
    },
    {
      brand: "Trader Joe's",
      address: '1885 University Ave, Berkeley, CA 94703',
      phone: '(510) 204-9074',
      time: '08:00-21:00',
      location: [37.871713, -122.273071],
    },
    {
      brand: "Trader Joe's",
      address: '5700 Christie Ave, Emeryville, CA 94608',
      phone: '(510) 658-8091',
      time: '08:00-21:00',
      location: [37.837047, -122.293903],
    },
    // {"address": "3250 Lakeshore Ave, Oakland, CA 94610",
    // "phone": "(510) 238-9076",
    // "time": "08:00-21:00"
    // },
    // {"address": "225 El Cerrito Plaza, El Cerrito, CA 94530",
    // "phone": "(510) 524-7609",
    // "time": "08:00-21:00"
    // },
    // {"address": "2217 South Shore Center, Alameda, CA 94501",
    // "phone": "(510) 769-5450",
    // "time": "08:00-21:00"
    // }
  ],
  Safeway: [
    {
      brand: 'Safeway',
      address: '6310 College Ave, Oakland, CA 94618',
      phone: '(510) 985-0012',
      time: '05:00-24:00',
      location: [37.85073, -122.252364],
    },
    {
      brand: 'Safeway',
      address: '3889 San Pablo Ave, Emeryville, CA 94608',
      phone: '(510) 450-1200',
      time: '05:00-24:00',
      location: [37.829478, -122.280603],
    },
    // {"address": "5100 Broadway, Oakland, CA 94611",
    // "phone": "(510) 285-0782",
    // "time": "05:00-24:00"
    // },
    {
      brand: 'Safeway',
      address: '1444 Shattuck Place, Berkeley, CA 94709',
      phone: '(510) 526-3086',
      time: '05:00-24:00',
      location: [37.880819, -122.269725],
    },
    {
      brand: 'Safeway',
      address: '1550 Shattuck Ave., Berkeley, CA 94709',
      phone: '(510) 841-7942',
      time: '06:00-23:00',
      location: [37.878793, -122.269677],
    },
    // {"address": "1500 Solano Ave, Albany, CA 94707",
    // "phone": "(510) 525-4107",
    // "time": "05:00-24:00"
    // },
    // {"address": "3747 Grand Ave, Oakland, CA 94610",
    // "phone": "(510) 465-4187",
    // "time": "06:00-24:00"
    // }
  ],
};
