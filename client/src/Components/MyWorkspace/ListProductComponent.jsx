import { useEffect, useState } from "react"
import { useAuth } from "../security/AuthContext";
import { retrieveProductsApi } from "../api/ExecutiveInsightApiService";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import AddProductComponent from "./AddProductComponent";
import ProductConponent from "./ProductComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import '../styles/ListComponent.css'

export default function ListProductComponent() {

    const [hasProducts, setHasProduct] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [show, setShow] = useState(false);
    const authContext = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveProductsApi(id)
            .then((response) => {
                setHasProduct(response.data.length > 0)
                setProducts(response.data)
            })
            .catch((error) => navigate('/error'))
    }

    function showForm() {
        setShow(true);
    }

    return (
        <div className="ListProductComponent">
            {show &&
                <AddProductComponent setShow={setShow} id={id} isEdit={false} product={null} />
            }
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}>
                    <h2 className="mx-3 text-start">Products</h2>
                    <hr />
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="w-100 py-2 create text-center" onClick={showForm}><FontAwesomeIcon icon={faPlus} /></div>
                                </td>
                            </tr>
                            {hasProducts &&
                                products.map(
                                    product => (
                                        <tr key={product.productId}>
                                            <td>
                                                <ProductConponent product={product} id={id} />
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}