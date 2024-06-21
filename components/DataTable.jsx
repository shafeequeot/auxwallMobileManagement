import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import moment from 'moment'
import color from '../utility/color'

const DataTable = ({ Heading = [], Data = [], maxRow = 10 }) => {
    const [datas, setData] = useState([])

    useEffect(()=>{
       Data && setData([...Data])
    },[Data])

    return (
        <View>
            <View style={styles.headerRow}>
                {
                    Heading?.map((heading, idx) => (
                        <Text key={idx} style={{ width: heading?.width, fontWeight: 'bold' }}>{heading?.label}</Text>
                    ))
                }

            </View>
            <View>
                {
                    datas?.map((data, idx)=>(
                        maxRow > idx &&
                        <View key={idx} style={styles.dataRow}>
                            {
                                Heading?.map((hd, id)=>(
                                    hd?.item == 'idx' ? 
                                    <Text style={[{ width: hd?.width, fontSize: 12 }]}  key={id}>{idx+1}</Text>
                                    : hd?.type=='date' ? 
                                    <Text style={{ width: hd?.width, fontSize: 12 }}  key={id}>{moment(data[`${hd.item}`]).isValid() ? moment(data[`${hd.item}`]).format("DD-MM-YYYY") : ''}</Text>
                                    : 
                                    <Text style={{ width: hd?.width, fontSize: 12 }}  key={id}>{data[`${hd.item}`]}</Text>
                                ))
                            }
                        </View>
                    ))
                }
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      backgroundColor: '#BFDBFE', 
      alignItems: 'center',
      padding: 8, 
      gap: 4,
    },
    dataRow: {
      flexDirection: 'row',
      borderBottomWidth: 1, 
      borderBottomColor: color.lightGray, 
      alignItems: 'center',
      padding: 8, 
      gap: 4,
     
    },

  });

export default DataTable