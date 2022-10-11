import {CurrencyDollarIcon} from "@heroicons/react/24/solid";

const Routes = [
    {
        label: 'Transactions',
        icon: <CurrencyDollarIcon className='w-5 h-5'/>,
        id: 0,
        path: '/home/transactions',
        roles: ['admin']
    }
];

export default Routes