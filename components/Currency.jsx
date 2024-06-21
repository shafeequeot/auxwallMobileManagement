import { View, Text } from 'react-native'
import React from 'react'
import currency from 'currency.js';

const Currency = ({Amount=0, Symbol = true, Negative = true, ClassName=""}) => {

  return (
    <View>
      <Text style={ClassName}>{currency(Amount, 
      {symbol: Symbol ? 'AED' : "", pattern: '# !', negativePattern: Negative ? '-# !' : '# !', precision: 2, 
}).format()}</Text>
    </View>
  )
}

export default Currency