import constants from '../constants';  
import { gql } from '@apollo/client';
import { useQuery} from '@apollo/react-hooks';
// Look at this file and see how the watchList is strucutred
const COUNT_QUERY = gql`
  query statsCount($locationKeywords: [String!]!, $severity: Int) {
    statsCount(locationKeywords: $locationKeywords, severity: $severity) 
  }
`;

export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
    const { loading, error, data} = useQuery(COUNT_QUERY, {variables:{
        locationKeywords: ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣",
        "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣"],
        severity: 1
    }});
    console.log(data)
    const counts = data;

    // TODO
    // use subscription
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}