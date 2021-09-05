import React from 'react'
import { Search } from "../Search"
import { render, fireEvent, wait } from "@testing-library/react-native"
import { Keyboard } from 'react-native'

describe('Search screen', () => {
    it('should hide the keyboard', async () => {
        Keyboard.dismiss = jest.fn()
        const { getByTestId } = render(<Search/>)
        fireEvent.changeText(getByTestId('searchBar'), 'someValue')
        wait(() => expect(Keyboard.dismiss).toHaveBeenCalled())
    })
})