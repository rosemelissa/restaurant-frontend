import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";

function AdminTables(): JSX.Element {
    const [tables, setTables] = useState<{table_id: number; capacity: number}[]|null>(null);

    useEffect(() => {
        const getTables = async () => {
            const tableData = await axios.get(`${baseUrl}/alltables`);
            setTables(tableData.data)
        }
        getTables();
    }, [])
    return (
        <>
        <Link to="/admin-tools" className='orange-button top-left-button'>Admin Tools</Link>
        <div id="tables">
        <h2>Tables</h2>
        <div id='table-info'>
        {tables &&
            tables.map((table, i) => {
                return (
                    <p key={i}>Table: {table.table_id} - Capacity: {table.capacity}</p>
                )
            })
        }
        </div>
        </div>
        </>
    )
}

export default AdminTables;