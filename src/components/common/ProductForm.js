/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Icon } from '@ahaui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from 'utils/schemas/productFormSchema';

function ProductForm({ product, handleFormSubmit }) {
  const {
    setValue,
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: product,
  });
  const navigate = useNavigate();
  const imageUrl = watch(['imageUrl'])[0];
  const isPriceInvalid = !!errors.price;
  const isImageUrlInvalid = !!errors.imageUrl;
  const isTitleInvalid = !!errors.title;

  React.useEffect(() => {
    // reset form when product is updated after first time rendered as null product
    reset(product);
  }, [product, reset]);

  const redirectToHome = () => navigate('/home');

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
        <FormGroup controlId="productForm.title">
          <Form.Label>Title</Form.Label>
          <Form.Input
            type="text"
            isInvalid={isTitleInvalid}
            {...register('title')}
            onBlur={(e) => setValue('title', e.target.value.trim())}
          />
          <Form.Feedback type="invalid" role="alert">
            {errors?.title?.message}
          </Form.Feedback>
        </FormGroup>
        <FormGroup controlId="productForm.imageUrl">
          <Form.Label>Image url</Form.Label>
          <Form.Input
            type="text"
            isInvalid={isImageUrlInvalid}
            {...register('imageUrl')}
            onBlur={(e) => setValue('imageUrl', e.target.value.trim())}
          />
          <Form.Feedback type="invalid" role="alert">
            {errors?.imageUrl?.message}
          </Form.Feedback>
        </FormGroup>
        <FormGroup controlId="productForm.price">
          <Form.Label>Price (VND)</Form.Label>
          <Form.Input
            type="text"
            isInvalid={isPriceInvalid}
            {...register('price')}
            onBlur={(e) => setValue('price', e.target.value.trim())}
          />
          <Form.Feedback type="invalid" role="alert">
            {errors?.price?.message}
          </Form.Feedback>
        </FormGroup>
        <SaveButton size="small" variant="primary">
          <Button.Label>Save</Button.Label>
        </SaveButton>
      </StyledForm>
      <ProductImage
        src={
          isImageUrlInvalid || !imageUrl
            ? `/Assets/ImageFallback.jpeg`
            : imageUrl
        }
      />
      <GoBackButton onClick={redirectToHome} data-testid="return-button">
        <Icon size="medium" name="arrowRoundBack" />
      </GoBackButton>
    </Wrapper>
  );
}

const ProductImage = styled.img`
  width: 40%;
  height: 100%;
  object-fit: cover;
  border: 3px solid;
  border-radius: 12px;
`;

const StyledForm = styled.form`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormGroup = styled(Form.Group)`
  width: 100%;
`;

const SaveButton = styled(Button)`
  width: max(10%, 70px);
`;

const GoBackButton = styled(Button)`
  position: absolute;
  top: 4%;
  left: 2%;
  width: max(5%, 52px);
  height: max(6%, 24px);
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  border: 1px solid;
  border-radius: 12px;
  margin: 40px auto;
  padding: 60px;
  gap: 40px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default ProductForm;
