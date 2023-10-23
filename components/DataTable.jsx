import { View, Text } from 'react-native'
import React from 'react'
import moment from 'moment'

const DataTable = ({ Heading = [], Data = [], maxRow = 10 }) => {
    return (
        <View>
            <View className="flex flex-row bg-blue-100 items-center p-2">
                {
                    Heading?.map((heading, idx) => (
                        <Text key={idx} style={{ width: heading?.width }} className="font-bold">{heading?.label}</Text>
                    ))
                }

            </View>
            <View>
                {
                    Data?.map((data, idx)=>(
                        maxRow > idx &&
                        <View key={idx} className="flex flex-row border-b border-b-blue-50">
                            {
                                Heading?.map((hd, id)=>(
                                    hd?.item == 'idx' ? 
                                    <Text style={{ width: hd?.width }} className="p-2 text-xs" key={id}>{idx+1}</Text>
                                    : hd?.type=='date' ? 
                                    <Text style={{ width: hd?.width }} className="p-2 text-xs" key={id}>{moment(data[`${hd.item}`]).isValid() ? moment(data[`${hd.item}`]).format("DD-MM-YYYY") : ''}</Text>
                                    : 
                                    <Text style={{ width: hd?.width }} className="p-2 text-xs" key={id}>{data[`${hd.item}`]}</Text>
                                ))
                            }
                        </View>
                    ))
                }
            </View>
            
        </View>
    )
}

export default DataTable