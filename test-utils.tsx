// test-utils.js
import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react-native'
import { View } from 'react-native'

const AllTheProviders: FunctionComponent<any> = ({ children }) => {
  return (
    <View>
      {children}
    </View>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }