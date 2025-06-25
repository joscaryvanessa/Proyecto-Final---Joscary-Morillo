import PropTypes from 'prop-types';
import banner from '../../assets/banner.jpg';
import './Home.css';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

function Home({ items }) {
  return (
    <>
      <Helmet>
        <title>Inicio | Amargo & Aromático</title>
        <meta name="description" content="Bienvenido a Amargo & Aromático. Descubre nuestra cafetería y productos gourmet." />
      </Helmet>
      <div>
        <img
          src={banner}
          alt="Banner principal"
          className="banner-img"
          style={{
            width: '100%',
            maxHeight: '850px'
          }}
        />
      </div>

      {items.map((item, idx) => (
        <Row
          key={idx}
          className="align-items-center"
          style={{ backgroundColor: item.backgroundColor, color: 'white' }}
        >
          {item.imageFirst ? (
            <>
              <Col md={6} className="d-flex justify-content-center">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="img-fluid grid-image-hover bordered-image"
                  width={item.width}
                  height={item.height}
                  style={{ maxHeight: item.height }}
                />
              </Col>
              <Col md={6}>
                <p
                  className="mb-0 text-hover-animate texto-estilizado"
                  style={{
                    marginRight: idx !== 1 ? '40%' : undefined,
                    marginLeft: idx === 1 ? '30%' : undefined
                  }}
                >
                  {item.text}
                </p>
              </Col>
            </>
          ) : (
            <>
              <Col md={6}>
                <p
                  className="mb-0 text-hover-animate texto-estilizado"
                  style={{
                    marginRight: idx !== 1 ? '40%' : undefined,
                    marginLeft: idx === 1 ? '30%' : undefined
                  }}
                >
                  {item.text}
                </p>
              </Col>
              <Col md={6}>
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="img-fluid grid-image-hover bordered-image bordered-item-right"
                  width={item.width}
                  height={item.height}
                  style={{ maxHeight: item.height }}
                />
              </Col>
            </>
          )}
        </Row>
      ))}
    </>
  );
}

Home.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      imageFirst: PropTypes.bool.isRequired,
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      backgroundColor: PropTypes.string.isRequired
    })
  ).isRequired
};

Home.defaultProps = {
  items: []
};

export default Home;
