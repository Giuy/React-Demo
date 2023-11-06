import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

type DataTable = {
    dataRow: DataTableType[]
}

type DataTableType = {
    index?: number,
    position?: string,
    deadLine?: string,
    place?: string,
    id?: string,
}

function TableCustome(props: DataTable) {
    const {dataRow} = props;
    const navigate = useNavigate();

    const handleRowClick = (item: any) => {
        navigate("/detail/" + item.id, { state: 'recruit'});
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="table"> 
                <TableHead >
                    <TableRow>
                        <TableCell className='textCenter'>{t('index')}</TableCell>
                        <TableCell className='textCenter'>{t('position')}</TableCell>
                        <TableCell className='textCenter'>{t('dealine')}</TableCell>
                        <TableCell className='textCenter'>{t('place')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRow.map((item, index) => (
                        <TableRow key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer'}}>
                            <TableCell>{item.index}</TableCell>
                            <TableCell>{item.position}</TableCell>
                            <TableCell>{item.deadLine}</TableCell>
                            <TableCell>{item.place}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableCustome;