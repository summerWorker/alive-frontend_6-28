import React, { useEffect, useState } from 'react';
import { addDietService, addFoodService, getFoodService } from '../../../service/dataService/dietService';
import { Image, List, InputNumber, Button, Select, DatePicker, message, Modal, Form, Input, Radio } from 'antd';
import { Avatar, Box, Grid } from '@mui/material';
import { BulbOutlined, CoffeeOutlined } from '@ant-design/icons';
import { styled } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import dayjs from 'dayjs';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#AAC8A7',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 50,
    height: 50,
    background: '#FFEC5C',
    clipPath: 'polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%)',
    top: 15,
    left: 450,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 30,
    height: 30,
    background: '#FFEC5C',
    clipPath: 'polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%)',
    top: 35,
    left: 500,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  }
}));

const infoFormat = 'YYYY-MM-DD';

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="自定义食物"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="食物名称"
          rules={[
            {
              required: true,
              message: '请输入食物名称！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="picture"
          label="图片路径"
          rules={[
            {
              required: true,
              message: '请输入图片路径！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="calorie"
          label="卡路里"
          rules={[
            {
              required: true,
              message: '请输入卡路里含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="carbohydrate"
          label="碳水化合物"
          rules={[
            {
              required: true,
              message: '请输入碳水化合物含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="protein"
          label="蛋白质"
          rules={[
            {
              required: true,
              message: '请输入蛋白质含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fat"
          label="脂肪"
          rules={[
            {
              required: true,
              message: '请输入脂肪含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dietaryFiber"
          label="膳食纤维"
          rules={[
            {
              required: true,
              message: '请输入膳食纤维含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sodium"
          label="钠"
          rules={[
            {
              required: true,
              message: '请输入钠含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const FoodList = () => {
  const [data, setData] = useState([]);
  const [foodSelectList, setFoodSelectList] = useState([]);
  useEffect(() => {
    getFoodService(1).then((res) => {
      if (res && res.status === 1) {
        setData(res.data.food);
        res.data.food.forEach((item) => {
          setFoodSelectList((prevState) => [...prevState, { name: item.name, amount: 0, type: 0, time: dayjs().format(infoFormat) }]);
        });
      }
    });
  }, []);

  const selectOptions = [
    {
      value: 0,
      label: '早餐'
    },
    {
      value: 1,
      label: '午餐'
    },
    {
      value: 2,
      label: '晚餐'
    },
    {
      value: 3,
      label: '加餐'
    }
  ];

  const handleCheck = () => {
    let haveFood = false;
    foodSelectList.forEach((item) => {
      if (item.amount !== 0) {
        addDietService(1, item.name, item.amount, item.type, item.time).then((res) => {
          if (res && res.status === 1) {
            message.success('添加成功');
          }
        });
        haveFood = true;
      }
    });
    //刷新界面
    if (!haveFood) {
      message.error('请至少选择一种食物');
    } else {
      window.location.reload();
    }
  };

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    addFoodService(
      values.name,
      values.picture,
      1,
      Number(values.calorie),
      Number(values.carbohydrate),
      Number(values.protein),
      Number(values.fat),
      Number(values.dietaryFiber),
      Number(values.sodium)
    ).then((res) => {
      if (res && res.status === 1) {
        message.success(res.msg);
      }
    });
    setOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#E9FFC2', color: '#1A5D1A', padding: '20px', borderRadius: '10px' }}>
      <Grid container direction={'column'}>
        <Grid item>
          <h1>食物列表</h1>
          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <Button
                onClick={() => {
                  handleCheck();
                }}
              >
                确认
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                自定义食物
              </Button>
              <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.name}>
                <>
                  <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                      <Grid container justifyContent={'spacing-between'}>
                        <Grid item lg={8}>
                          <Grid container direction={'column'}>
                            <Grid item>
                              <Grid container alignItems={'center'}>
                                <Grid item>
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      backgroundColor: '#E9FFC2',
                                      color: '#FFEC5C',
                                      mt: 1
                                    }}
                                  >
                                    <BulbOutlined />
                                  </Avatar>
                                </Grid>
                                <Grid item>
                                  <h2 style={{ marginLeft: '10px' }}>{item.name}</h2>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <h4>
                                碳水化合物:{item.carbohydrate}克 蛋白质:{item.protein}克 脂肪:{item.fat}克
                              </h4>
                              <h3>热量:{item.calorie}卡</h3>
                            </Grid>
                            <Grid item>
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                  <InputNumber
                                    prefix={<CoffeeOutlined />}
                                    value={foodSelectList.find((food) => food.name === item.name).amount}
                                    onChange={(value) => {
                                      setFoodSelectList((prevState) =>
                                        prevState.map((food) => {
                                          if (food.name === item.name) {
                                            return { ...food, amount: value };
                                          }
                                          return food;
                                        })
                                      );
                                    }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Select
                                    style={{ width: 120 }}
                                    options={selectOptions}
                                    value={foodSelectList.find((food) => food.name === item.name).type}
                                    onChange={(value) => {
                                      setFoodSelectList((prevState) =>
                                        prevState.map((food) => {
                                          if (food.name === item.name) {
                                            return { ...food, type: value };
                                          }
                                          return food;
                                        })
                                      );
                                    }}
                                  />
                                </Grid>
                                <Grid item>
                                  <DatePicker
                                    value={dayjs(foodSelectList.find((food) => food.name === item.name).time)}
                                    onChange={(value) => {
                                      setFoodSelectList((prevState) =>
                                        prevState.map((food) => {
                                          if (food.name === item.name) {
                                            return { ...food, time: value.format(infoFormat) };
                                          }
                                          return food;
                                        })
                                      );
                                    }}
                                  ></DatePicker>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={4}>
                          <Image
                            src={item.picture}
                            style={{
                              width: '80%',
                              aspectRatio: 1
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </CardWrapper>
                </>
              </List.Item>
            )}
          ></List>
        </Grid>
      </Grid>
    </div>
  );
};
