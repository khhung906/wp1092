import Grid from '../components/Grid'
export default function Row ({row_idx, row_vector}) {
    let grid_id = "grid-"+row_idx+"-";
    let value_id="value-"+row_idx+"-";
    return (
        <tr>
          {row_vector.map((value, col_idx) => (<Grid value={value} grid_id={grid_id+col_idx}
                                                    value_id={value_id+col_idx} key={grid_id+col_idx}/>))}
        </tr>
    );
};