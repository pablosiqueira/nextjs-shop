import { useContext } from "react"
import { UserContext } from '../../context/user-context';
import Button from "react-bootstrap/Button"
import Head from "next/head";
import ListGroup from 'react-bootstrap/ListGroup';
import Link from "next/link";
import {FaKey} from 'react-icons/fa'
import {ImExit} from 'react-icons/im'
import {HiOutlineNewspaper} from 'react-icons/hi'

const UserMainPage = props => {
    const userCtx = useContext(UserContext)
    const user = userCtx.user

    return (
        <>
            <Head>
                <title>User Area</title>
            </Head>
            <h1 className="text-center my-4">User Area</h1>
                <div className="mx-1">
                    <h5 className="text-center my-2">Personal Data - <Link href='/user/edit?mode=data'>Edit</Link></h5>
                    <ListGroup variant="flush" className="d-block mx-auto border" style={{maxWidth:'max-content'}}>
                        <ListGroup.Item><b>Name: </b>{user.name}</ListGroup.Item>
                        <ListGroup.Item><b>E-mail: </b>{user.email}</ListGroup.Item>
                        <ListGroup.Item><b>Adress: </b><br/>
                            {user.address.street}<br/>
                            <b>Number:</b> {user.address.number} - <b>Zip:</b> {user.address.zip}<br/>
                            {user.address.city}/{user.address.state} - {user.address.country}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                
            <div className="d-flex flex-wrap justify-content-center my-4">
                <div className="m-1">
                    <Link href={'/user/orders/' + user._id}>
                    <Button variant="secondary">
                    <HiOutlineNewspaper size='2.5rem'/><br/>
                    View Orders
                    </Button>
                    </Link>
                </div>

                <div className="m-1">
                    <Link href='/user/edit?mode=password'>
                    <Button variant="dark">
                    <FaKey size='2.5rem'/><br/>
                    Change Password
                    </Button>
                    </Link>
                </div>

                <div className="m-1">
                    <Button variant="danger" onClick={userCtx.logout}>
                    <ImExit size='2.5rem'/><br/>
                    Logout
                    </Button>
                </div>
            </div>

        </>
    )
}

export default UserMainPage