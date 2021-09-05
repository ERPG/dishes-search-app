import React from 'react'
const mock = jest.genMockFromModule('react-native-star-rating');

const StarRating = jest.fn((props) => React.createElement('view', props, props.children || null))
export default StarRating