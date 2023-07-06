import { Image, List, Space, theme } from 'antd';
import { BulbOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Grid, Box } from '@mui/material';
import { width } from '@mui/system';
import { ManOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';

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

const RecommendRecipe = () => {
  const data = [
    {
      name: '糖醋排骨',
      material: '排骨，醋，糖',
      description:
        '糖醋排骨是一道汉族传统名菜，属于鲁菜系。糖醋排骨是山东菜的代表菜之一，属于鲁菜系。糖醋排骨是山东菜的代表菜之一，属于鲁菜系。糖醋排骨是山东菜的代表菜之一，属于鲁菜系。',
      practice: [
        '将排骨洗净，切成小段，用盐、料酒、酱油、姜末腌制半小时。',
        '锅中放油，烧至五成热，放入排骨，炸至金黄色捞出沥油。',
        '锅中留底油，放入葱姜蒜爆香，放入炸好的排骨，翻炒均匀。',
        '放入醋、白糖、酱油、料酒、盐、胡椒粉、鸡精、水，大火烧开，转小火焖煮10分钟。'
      ],
      photo: 'https://i3.meishichina.com/atta/recipe/2023/07/05/20230705168852471756098910606182.jpg?x-oss-process=style/p800'
    },
    {
      name: '酸菜鱼',
      material: '鱼，酸菜，辣椒',
      description:
        '酸菜鱼是一道汉族传统名菜，属于川菜系。酸菜鱼是一道汉族传统名菜，属于川菜系。酸菜鱼是一道汉族传统名菜，属于川菜系。酸菜鱼是一道汉族传统名菜，属于川菜系。',
      practice: [
        '将鱼洗净，切成小段，用盐、料酒、酱油、姜末腌制半小时。',
        '锅中放油，烧至五成热，放入鱼，炸至金黄色捞出沥油。',
        '锅中留底油，放入葱姜蒜爆香，放入炸好的鱼，翻炒均匀。',
        '放入酸菜、白糖、酱油、料酒、盐、胡椒粉、鸡精、水，大火烧开，转小火焖煮10分钟。'
      ],
      photo: 'https://i3.meishichina.com/atta/recipe/2018/03/22/2018032215217166817009012879.jpg?x-oss-process=style/p800'
    }
  ];

  return (
    <>
      <div style={{ backgroundColor: '#E9FFC2', color: '#1A5D1A', padding: '20px', borderRadius: '10px' }}>
        <Grid container direction={'column'}>
          <Grid item>
            <h1>推荐食谱</h1>
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
                                <h4 style={{ marginTop: '-5px', marginBottom: '-5px' }}>材料：{item.material}</h4>
                              </Grid>
                              <Grid item>
                                <h4>
                                  做法：
                                  {item.practice.map((step, index) => {
                                    return (
                                      <li key={index}>
                                        {index + 1}.{step}
                                      </li>
                                    );
                                  })}
                                </h4>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item lg={4}>
                            <Image
                              src={item.photo}
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
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default RecommendRecipe;
