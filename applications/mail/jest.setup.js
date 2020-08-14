import '@testing-library/jest-dom/extend-expect';

// Silence warnings on expect to throw https://github.com/testing-library/react-testing-library/issues/157
// console.error = () => {};
// console.warn = () => {};

// These modules uses require.context which is a Webpack feature which can't work in Jest
jest.mock('proton-shared/lib/i18n/dateFnLocales.ts', () => ({}));
jest.mock('react-components/containers/payments/CardNumberInput.js', () => ({}));
jest.mock('react-components/containers/paymentMethods/PaymentMethodDetails.js', () => ({}));
jest.mock('react-components/containers/vpn/OpenVPNConfigurationSection/Country.js', () => ({}));

// Globally mocked react-components modules
jest.mock('react-components/hooks/useEventManager.js', () => {
    const subscribe = jest.fn();
    const call = jest.fn();

    const result = () => {
        return { subscribe, call };
    };

    result.subscribe = subscribe;
    result.call = call;

    return result;
});

// Globally mocked upload helper (standard requests are mocked through context)
jest.mock('./src/app/helpers/upload');

global.MutationObserver = class {
    constructor() {
        // Nothing
    }
    disconnect() {
        // Nothing
    }
    observe() {
        // Nothing
    }
};
