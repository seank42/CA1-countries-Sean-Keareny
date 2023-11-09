import {Link } from 'react-router-dom';
import { Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';


const CountryCard = (props) => {
    return(
     <Card style={{ width: '15rem' }}  className="ms-2 mb-4 bg-dark pt-4 border-primary  square border border-4" >
        <Card.Img  src={props.flag} variant='top' />
        <Card.Body className='bg-dark'>
            <Card.Title><Link  to={`/country/${props.name}`}>{props.name}</Link></Card.Title>
          
        </Card.Body>
        <ListGroup className="list-group-flush border-light">
        <ListGroup.Item className="fw-bold text-light bg-dark">Continent -{props.region}</ListGroup.Item>
        </ListGroup>
     </Card>
    );
}

export default CountryCard;