/**
 * Dish summary tests
 */
import React from 'react';
import { DishSummary } from "../DishSummary";
import { render, fireEvent } from 'test-utils'; // Ignore error if shown
import { StackNavigationProp } from '@react-navigation/stack';

// Mocks
const goBackMock = jest.fn()
jest.mock('react-native-safe-area-context')
jest.mock('react-native-maps')
jest.mock('react-native-star-rating')

// Props
const props = {
    route: {
        key: '0',
        name: 'Summary' as any,
        params: {
            id: 0,
            dishId: 0,
            dishName: 'fakeDish',
            restaurantName: 'fakeName',
            restaurantAddress: 'Carrer de Calabria 169',
            restaurantLat: 0,
            restaurantLng: 0,
            rating: 5,
            reviewsCount: 10,
            restaurantId: 0,
            pictures: [
                {
                    "date": "2020-03-30T12:01:31.457+0000",
                    "hash": "2689a3ea77e61fb8598027074180b3906c9f0b01ac2a1a9fe4a59cd25f32dae1",
                    "id": 3,
                    "mimeType": "image/jpeg",
                    "ratingId": 4,
                },
                {
                    "date": "2020-03-27T18:35:58.781+0000",
                    "hash": "af9e482534e5b3d3c52f5e9fc3bc4dedcfc7ca8b5b7368e3225b1434ff2981e7",
                    "id": 2,
                    "mimeType": "image/jpeg",
                    "ratingId": 28,
                }

            ]
        }
    },
    navigation: {
        goBack: goBackMock as any
    } as StackNavigationProp<any, any>
}

// Render component
const { getByTestId } = render(<DishSummary {...props} />);

describe('Components', () => {
    describe('Header components', () => {
        [
            'dishName',
            'backspaceIcon',
            'restaurantName'
        ].forEach(componentName => {
            it(`should render ${componentName} component`, () => {
                expect(getByTestId(componentName)).toBeTruthy()
            })
        })
    })
    describe('Rating components', () => { // Maybe rating should be a component itself
        [
            'rating',
            'ratingDesc'
        ].forEach(componentName => {
            it(`should render ${componentName} component`, () => {
                expect(getByTestId(componentName)).toBeTruthy()
            })
        })
    })
    describe('Images components', () => { // Maybe rating should be a component itself
        props.route.params.pictures.map(el => `image${el.id}`).forEach(componentName => {
            it(`should render ${componentName} component`, () => {
                expect(getByTestId(componentName)).toBeTruthy()
            })
        })
    })
})

describe('UI', () => {
    describe('backspace icon', () => {
        it('should call navigation go back on click', () => {
            const backspaceIcon = getByTestId('backspaceIcon')
            fireEvent.press(backspaceIcon)
            expect(goBackMock.mock.calls.length).toBe(1)
        })
    })
});
