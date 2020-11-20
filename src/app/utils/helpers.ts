export const values = (obj: object) => Object.entries(obj).map(([value, name]) => ({value, name}));

interface Helpers {
    formatter?: Intl.NumberFormat;
}
const helpers: Helpers = {

};
export default helpers;