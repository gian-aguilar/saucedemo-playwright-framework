export const users = {
    standard: {
        username: process.env.SAUCE_STANDARD_USER || 'standard_user',
        password: process.env.SAUCE_STANDARD_PASSWORD || 'secret_sauce',
    },
    lockedOut: {
        username: 'locked_out_user',
        password: process.env.SAUCE_STANDARD_PASSWORD || 'secret_sauce',
    },
};

export const products = {
    product1: 'Sauce Labs Onesie',
    product2: 'Sauce Labs Backpack',
};

export const checkoutInformation = {
    firstName: 'Tomislav',
    lastName: 'Gavran',
    postalCode: '1234',
};