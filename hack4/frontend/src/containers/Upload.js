import Uploader from '../components/Uploader';

import "./Upload.css";
import { gql } from '@apollo/client';
import { useMutation} from '@apollo/react-hooks';

// Look at this file and see how the watchList is strucutred
const PEOPLE_MUTATION = gql`
  mutation insertPeople($data: [Person]!){
    insertPeople(data: $data)
  }
`;

//insertPeople(data: [Person]): Boolean!
export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
    const [addPeople] = useMutation(PEOPLE_MUTATION);

    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={(args) => {addPeople(args)}}/>
        </div>
    </div>;
}
