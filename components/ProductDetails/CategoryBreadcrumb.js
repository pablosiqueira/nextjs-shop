import Breadcrumb from 'react-bootstrap/Breadcrumb';

const CategoryBreadcrumb = (props) => {
    let links = [{link:'/products/', section: 'products'}]
    let paths = '/products/'
    props.sections.map(
        item => {
            paths = paths + item + '/'
            links.push({link: paths, section: item})
        }   
    )

    return (
        <>
        <Breadcrumb className='m-2 text-capitalize'>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            {links.map(item => (
                <Breadcrumb.Item href={item.link} key={item.section}>{item.section}</Breadcrumb.Item>
            ))}
            <Breadcrumb.Item active>{props.lastItem}</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}

export default CategoryBreadcrumb