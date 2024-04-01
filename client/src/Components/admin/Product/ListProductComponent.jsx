import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../security/AuthContext";
import { retrieveProductsApi } from "../../../api/ExecutiveInsightApiService";

import ProductFormComponent from "./ProductFormComponent";
import ProductConponent from "./ProductComponent";

import '../../../styles/ListComponent.css'

export default function ListProductComponent() {

    const [hasProducts, setHasProduct] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [show, setShow] = useState(false);

    const authContext = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        authContext.refresh()
        const getProducts = async () => {
            await retrieveProductsApi(id)
                .then((response) => {
                    setHasProduct(response.data.length > 0)
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.log("Error fetching products: " + error)
                    navigate('/error')
                })
        }
        getProducts();
    }, [authContext, id, navigate])

    const showForm = () => {
        setShow(true);
    }

    return (
        <div className="ListProductComponent">
            {show &&
                <ProductFormComponent setShow={setShow} id={id} isEdit={false} product={null} />
            }
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
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
                </div>
            </div>
        </div>
    )
}