import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../security/AuthContext";
import { retrieveProductsApi } from "../../../api/ExecutiveInsightApiService";

import ProductFormComponent from "./ProductFormComponent";
import SingleProductConponent from "./SingleProductComponent";

import '../../../styles/ListComponent.css'

export default function ListProductComponent() {

    const [hasProducts, setHasProduct] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([{}]);

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
                    setFilteredProducts(response.data)
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

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearch(term);
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setHasProduct(filtered.length > 0);
        setFilteredProducts(filtered);
    }

    return (
        <div className="container w-100 mt-4">
            {show &&
                <ProductFormComponent setShow={setShow} id={id} isEdit={false} product={null} />
            }
            <div className="d-flex">
                <h2 className="mx-3 text-start">Products</h2>
                <input placeholder="&#xf002; Search Product" value={search} style={{ fontFamily: 'Arial, FontAwesome', marginLeft: "160px", backgroundColor: "#f8f9fa" }} className="form-control w-50 text-center" onChange={handleSearch} />
            </div>
            <hr />
            <table className='table'>
                <tbody>
                    <tr>
                        <td>
                            <div className="w-100 py-2 create text-center" onClick={showForm}><FontAwesomeIcon icon={faPlus} /></div>
                        </td>
                    </tr>
                    {hasProducts &&
                        filteredProducts.map(
                            product => (
                                <tr key={product.productId}>
                                    <td>
                                        <SingleProductConponent product={product} id={id} />
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}