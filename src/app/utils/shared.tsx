export const stringToAdress = (address: string) : IAddress => {
    const addressArray = address.split(',');
    const street = address || "";
    const streetLine2 = "";
    const city = addressArray[1] ? addressArray[1] : "Paris";
    const postcode = 70123;
    const country = addressArray[2] ? addressArray[2] : "France";
    return {street, city, postcode, country, streetLine2};
}