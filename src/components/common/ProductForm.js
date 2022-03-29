/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form, Button } from '@ahaui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '../../utils/schemas/productFormSchema';

const imageFallback =
  'https://banksiafdn.com/wp-content/uploads/2019/10/placeholde-image.jpg';

function ProductForm({ product, handleFormSubmit }) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: product,
  });

  const imageUrl = watch(['imageUrl'])[0];
  const isPriceInvalid = !!errors.price;
  const isImageUrlInvalid = !!errors.imageUrl;
  const isTitleInvalid = !!errors.title;

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
        <FormGroup controlId="productForm.title">
          <Form.Label>Title</Form.Label>
          <Form.Input
            type="text"
            isInvalid={isTitleInvalid}
            {...register('title')}
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
          />
          <Form.Feedback type="invalid" role="alert">
            {errors?.imageUrl?.message}
          </Form.Feedback>
        </FormGroup>
        <FormGroup controlId="productForm.price">
          <Form.Label>Price</Form.Label>
          <Form.Input
            type="text"
            isInvalid={isPriceInvalid}
            {...register('price')}
          />
          <Form.Feedback type="invalid" role="alert">
            {errors?.price?.message}
          </Form.Feedback>
        </FormGroup>
        <SaveButton size="small" variant="primary">
          <Button.Label class=".u-text500">Save</Button.Label>
        </SaveButton>
      </StyledForm>
      <ProductImage
        src={isImageUrlInvalid || !imageUrl ? imageFallback : imageUrl}
      />
    </Wrapper>
  );
}

const ProductImage = styled.img`
  width: 40%;
  height: 100%;
  object-fit: cover;
`;

const StyledForm = styled.form`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormGroup = styled(Form.Group)`
  width: '100%';
`;

const SaveButton = styled(Button)`
  width: max('10%', '70px');
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  border: 1px solid;
  margin: 40px auto;
  padding: 60px;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;
export default ProductForm;
