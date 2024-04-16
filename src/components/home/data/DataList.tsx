import { useEffect, useState } from 'react'
import { User } from '../../feature/data'
import { Card, Input } from '@mui/material'
import axios from 'axios'
import './data_list.scss'

export default function DataList() {
    const [data, setdata] = useState<User[]>([]);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                setdata(response.data);
            })
    }, []);

    //data search 
    const [, setSearch] = useState('');
    const searchitem = (searchValue: string) => {
        setSearch(searchValue);
        if (searchValue.trim() === '') {
            axios.get(`https://jsonplaceholder.typicode.com/users`)
                .then((response) => {
                    setdata(response.data);
                });
        } else {
            const filteredData = data.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
            });
            setdata(filteredData);
        }
    }
    return (
        <main>
            <Input placeholder='Search...' sx={{ width: '100%', minWidth: '200px', maxWidth: '350px' }} onChange={(e) => { searchitem(e.target.value) }} />
            <br /><br />
            <div className='card'>
                {data.map((user) => (
                    <Card key={user.id} className='user-card'>
                        <div style={{ padding: '10px 20px' }}>
                            <p>{user.name}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </main>
    )
}
