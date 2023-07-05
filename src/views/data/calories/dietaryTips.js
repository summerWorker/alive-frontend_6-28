import { Grid } from '@mui/material';
import { List, Typography } from 'antd';

const DietaryTips = () => {
  const data = [
    '多吃水果和蔬菜：水果和蔬菜富含维生素、矿物质和纤维，对身体健康非常有益。尽量选择五颜六色的水果和蔬菜，以确保吸收多种营养。',
    '控制食用加工食品：加工食品通常含有高量的盐、糖和不健康的脂肪。尽量选择新鲜食材烹饪健康的饭菜，避免过多依赖加工食品。',
    '保持适量的蛋白质摄入：蛋白质是身体建造和修复组织所必需的。选择瘦肉、鱼类、豆类和坚果作为良好的蛋白质来源，确保摄入足够的蛋白质。',
    '控制食用糖分：糖分是导致肥胖和其他健康问题的主要原因之一。减少糖的摄入可以有助于控制体重并改善整体健康。避免过多摄入含糖饮料和糖果，并注意隐藏在加工食品中的糖分。',
    '饮食多样化：保持均衡的饮食非常重要，吃各种不同类型的食物可以提供全面的营养。尽量包括谷物、蛋白质、蔬菜、水果和健康的脂肪在每餐中。'
  ];

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <Grid container direction={'column'}>
          <Grid item>
            <h1>饮食小贴士</h1>
          </Grid>
          <Grid item>
            <List dataSource={data} renderItem={(item) => <List.Item>{item}</List.Item>} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DietaryTips;
