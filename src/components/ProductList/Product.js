import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatVnd } from "../../utils/utilFunction";
import { useParams } from "react-router-dom";
const initialProduct = {
    id: "Testing id",
    price: 5200000,
    title: "ULTRABOOST 22",
    imageUrl:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/ULTRABOOST_22_DJen_GZ0127_01_standard.jpg",
    createdTimestamp: new Date(1647869066410),
};

const Product = ({ product = initialProduct }) => {
    const { title, imageUrl, price, id } = product;

    const handleDelete = () => {
        console.log("delete ", id);
    };

    return (
        <Wrapper>
            <ProductInformation>
                <Information flex={3}>{title}</Information>
                <Information flex={1}>{formatVnd(price)}</Information>
                <Information flex={1}>
                    <ImagePreview>
                        Preview
                        <Image src={imageUrl} />
                    </ImagePreview>
                </Information>
            </ProductInformation>
            <ProductActions>
                <NavigateButton to={`/product/${id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </NavigateButton>
                <Button onClick={handleDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                </Button>
            </ProductActions>
        </Wrapper>
    );
};

const Wrapper = styled.ul`
    width: 100%;
    border-bottom: 1px solid pink;
    height: 60px;
    margin: 0;
    padding: 0;
    gap: 20px;
    display: flex;

    &:last-child {
        border: none;
    }
`;

const ProductInformation = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const ProductActions = styled.div`
    flex: 1;
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Information = styled.span`
    flex: ${(prop) => prop.flex};
    border-right: 1px solid;
    border-left: 1px solid;
    padding-left: 20px;
    overflow: hidden;
    &:first-child {
        border-left: none;
    }
`;

const NavigateButton = styled(Link)`
    display: flex;
    height: fit-content;
    & i {
        height: fit-content;
        font-size: 24px;
    }
`;

const Button = styled.div`
    display: flex;
    height: fit-content;
    cursor: pointer;
    & i {
        height: fit-content;
        font-size: 24px;
    }
`;

const ImagePreview = styled.div`
    width: fit-content;
    cursor: pointer;
    &:hover img {
        display: unset;
    }
`;

const Image = styled.img`
    display: none;
    position: absolute;
    z-index: 2;
    height: min(72vh, 36vw);
    background-color: white;
    top: 4vh;
    left: 16vw;
`;

export default Product;
