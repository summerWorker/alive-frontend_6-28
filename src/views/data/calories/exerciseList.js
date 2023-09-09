import { Button, DatePicker, Form, Image, Input, InputNumber, List, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Grid } from '@mui/material';
import { BulbOutlined, CoffeeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { addExerciseService, addWorkoutService, getExerciseService } from '../../../service/dataService/workOutService';
const infoFormat = 'YYYY-MM-DD';

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="自定义运动"
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
          label="运动名称"
          rules={[
            {
              required: true,
              message: '请输入运动名称！'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="calorie"
          label="千卡/60分钟"
          rules={[
            {
              required: true,
              message: '请输入卡路里含量！'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const ExerciseList = (props) => {
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     name: '游泳',
  //     calorie: 398,
  //     picture: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.d4qyiFWZIU60rIcysnwCdAHaHD?pid=ImgDet&rs=1',
  //     user_id: 1
  //   },
  //   {
  //     id: 2,
  //     name: '走路',
  //     calorie: 94,
  //     picture: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.d4qyiFWZIU60rIcysnwCdAHaHD?pid=ImgDet&rs=1',
  //     user_id: 1
  //   }
  // ]);
  const [data, setData] = useState([]);
  const [exerciseSelectList, setExerciseSelectList] = useState([]);
  useEffect(() => {
    getExerciseService().then((res) => {
      if (res && res.status === 1) {
        setData(res.data.exercise);
        res.data.exercise.forEach((item) => {
          setExerciseSelectList((prevState) => [...prevState, { name: item.name, amount: 0, type: 0, time: dayjs().format(infoFormat) }]);
        });
      }
    });
  }, []);

  const handleCheck = () => {
    let haveExercise = false;
    exerciseSelectList.forEach((item) => {
      if (item.amount !== 0) {
        addWorkoutService(item.name, item.amount, item.time).then((res) => {
          if (res && res.status === 1) {
            message.success('添加成功');
          }
        });
        haveExercise = true;
      }
    });
    //刷新界面
    if (!haveExercise) {
      message.error('请至少选择一种运动');
    } else {
      window.location.reload();
    }
  };

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    addExerciseService(values.name, '', Number(values.calorie)).then((res) => {
      if (res && res.status === 1) {
        alert(res.msg);
        window.location.reload();
      } else {
        alert(res.msg);
      }
    });
    setOpen(false);
  };

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <Grid container direction={'column'}>
          <Grid item>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <h1>运动列表</h1>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    props.setPageState(0);
                  }}
                >
                  返回
                </Button>
              </Grid>
            </Grid>
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
                  自定义运动
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
              dataSource={data}
              renderItem={(item) => {
                return (
                  <List.Item key={item.name}>
                    <>
                      <Box sx={{ p: 2.25 }}>
                        <Grid container justifyContent={'spacing-between'}>
                          <Grid item>
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
                              <Grid container spacing={2}>
                                <Grid item>
                                  <h4>{item.calorie}千卡/60分钟</h4>
                                </Grid>
                                <Grid item>
                                  <InputNumber
                                    prefix={<CoffeeOutlined />}
                                    value={exerciseSelectList.find((exercise) => exercise.name === item.name).amount}
                                    onChange={(value) => {
                                      setExerciseSelectList((prevState) =>
                                        prevState.map((exercise) => {
                                          if (exercise.name === item.name) {
                                            return { ...exercise, amount: value };
                                          }
                                          return exercise;
                                        })
                                      );
                                    }}
                                  />
                                </Grid>
                                <Grid item>
                                  <DatePicker
                                    value={dayjs(exerciseSelectList.find((exercise) => exercise.name === item.name).time)}
                                    onChange={(value) => {
                                      setExerciseSelectList((prevState) =>
                                        prevState.map((exercise) => {
                                          if (exercise.name === item.name) {
                                            return { ...exercise, time: value.format(infoFormat) };
                                          }
                                          return exercise;
                                        })
                                      );
                                    }}
                                  ></DatePicker>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  </List.Item>
                );
              }}
            ></List>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
