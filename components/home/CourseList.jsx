import { View, Text, ScrollView, Dimensions } from 'react-native'
import DataTable from '../DataTable'


const Heading = [
    { label: "No", item: 'idx', width: 40 },
    { label: "Course", item: 'courseName', width: 170 },
    { label: "Active", item: 'activeMembers', width: 70 },
    { label: "New", item: 'currentMonthJoins', width: 70, },
    { label: "AllTime", item: 'allTimeMembers', width: 70, },
]


const CourseList = ({ Data }) => {

    const { width: screenWidth } = Dimensions.get('window');

    return (
        <View style={{ width: screenWidth - 60 }}>

            <Text style={{fontWeight: '800', marginBottom: 4}}>{Data?.name}</Text>
            <ScrollView horizontal>
                <ScrollView horizontal={true}>
                    <DataTable Heading={Heading} Data={Data.course} maxRow={100} />
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default CourseList