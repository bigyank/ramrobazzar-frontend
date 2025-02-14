import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import {
  productListAction,
  productCreateAction,
} from '../reducers/productReducers';
import { productDeleteAction } from '../reducers/adminReducer';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  const {
    loading: productLoading,
    error: productError,
    sucess: productSucess,
  } = useSelector((state) => state.productDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    error: createError,
    loading: createLoading,
    sucess: createSucess,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_RESET' });

    if (!userInfo || !userInfo.isAdmin) {
      return history.push('/login');
    }

    if (createSucess) {
      return history.push(`/admin/product/${createdProduct.id}/edit`);
    } else {
      dispatch(productListAction('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    productSucess,
    createSucess,
    createdProduct,
    pageNumber,
  ]);

  const deleteProductHandler = (id) => {
    dispatch(productDeleteAction(id));
  };

  const createProductHandler = () => {
    dispatch(productCreateAction());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            Create Product
          </Button>
        </Col>
      </Row>
      {productLoading && <Loader />}
      {productError && <Message variant="danger">{productError}</Message>}

      {createLoading && <Loader />}
      {createError && <Message variant="danger">{productError}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
