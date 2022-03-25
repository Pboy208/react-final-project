import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatVnd } from "../../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/productSlice";
import * as Toast from "../common/Toast";
import LoadingSpinner from "../common/LoadingSpinner";
import { device } from "../../constants/mediaQuery";
const ConfirmModal = React.lazy(() => import("./ConfirmModal"));

const Product = ({ product }) => {
    const { title, imageUrl, price, id } = product;
    const [isModalShow, setIsModalShow] = React.useState(false);
    const { isLoading } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProduct(id))
            .unwrap()
            .then(() => Toast.success("Delete success"));
    };

    const toggleIsModalShow = () => setIsModalShow((prev) => !prev);

    return (
        <>
            <LoadingSpinner isLoading={isLoading} />
            <Wrapper>
                <ProductInformation>
                    <Information flex={5}>{title}</Information>
                    <Information flex={2}>{formatVnd(price)}</Information>
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
                    <Button onClick={toggleIsModalShow}>
                        <i className="fa-solid fa-trash-can"></i>
                    </Button>
                </ProductActions>
            </Wrapper>
            {isModalShow && (
                <ConfirmModal
                    onConfirm={handleDelete}
                    message={"Do you really want to delete this item"}
                    content={title}
                    turnOff={toggleIsModalShow}
                />
            )}
        </>
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
    font-size: var(--font-size);
    &:first-child {
        border-left: none;
        overflow: hidden;
    }

    &:nth-child(2) {
        min-width: 80px;
    }

    &:last-child {
        min-width: 66px;
    }

    @media ${device.tablet} {
        padding-left: 10px;
        height: 40px;
    }

    @media ${device.mobile} {
        padding-left: 4px;
        height: 48px;
    }
`;

const NavigateButton = styled(Link)`
    display: flex;
    height: fit-content;
    & i {
        height: fit-content;
        font-size: var(--button-size);
    }
`;

const Button = styled.div`
    display: flex;
    height: fit-content;
    cursor: pointer;
    & i {
        height: fit-content;
        font-size: var(--button-size);
    }
`;

const ImagePreview = styled.div`
    padding-right: 20px;
    text-align: center;
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
