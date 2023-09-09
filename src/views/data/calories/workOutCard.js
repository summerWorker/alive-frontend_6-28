import { Card, Image, List } from 'antd';
import { Grid } from '@mui/material';

export const WorkOutCard = (props) => {
  return (
    <>
      <Card title={props.title}>
        {props.dataSource !== undefined && props.dataSource.length !== 0 ? (
          <List
            dataSource={props.dataSource}
            renderItem={(item) => (
              <List.Item>
                <>
                  <Grid container justifyContent="space-between" direction="row">
                    <Grid item alignItems="center">
                      {/*<Image*/}
                      {/*  src={item.food.picture}*/}
                      {/*  style={{*/}
                      {/*    width: '50px',*/}
                      {/*    aspectRatio: 1*/}
                      {/*  }}*/}
                      {/*></Image>*/}
                    </Grid>
                    <Grid item alignItems="center">
                      <h3>{item.exercise.name}</h3>
                    </Grid>
                    <Grid item alignItems="center">
                      <h4>{item.amount}分钟</h4>
                    </Grid>
                    <Grid item alignItems="center">
                      <h4>{((item.exercise.calorie * item.amount) / 60).toFixed(2)}千卡</h4>
                    </Grid>
                  </Grid>
                </>
              </List.Item>
            )}
          ></List>
        ) : (
          <>
            <h3>暂无数据</h3>
          </>
        )}
      </Card>
    </>
  );
};
