import Nav from 'react-bootstrap/Nav';
import classes from './TopNavBar.module.css'

const CategoriesBar = () => {
    const ctgs = ['all','shoes','shirts','shorts', 'jackets','acessories']
    return (<Nav className={classes.ctgbar} variant="pills" defaultActiveKey="/">
        {
            ctgs.map(item => {
                return <Nav.Item key={item}>
                <Nav.Link href={"/products/" + item} className={classes.ctglink}>{item}</Nav.Link>
              </Nav.Item>
            })
        }
  </Nav>)
}

export default CategoriesBar