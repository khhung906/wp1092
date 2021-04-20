export default function Grid ({value, grid_id, value_id}) {
    let temp_class_name = 'grid';
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}

    if(value !== 0){
        temp_class_name += ' level-'+value;
    }
    else{
        value = '';
    }
    
    value = mapping[value];
    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{value}</div>
            </div>
        </td>
    );
}