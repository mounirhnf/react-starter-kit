import {Utility} from 'types';

//------------------------------------------------------------------------------

const clsx: Utility.Clsx = (...classes) => classes.filter(Boolean).join(' ');

//------------------------------------------------------------------------------

export default clsx;
