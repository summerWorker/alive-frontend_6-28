import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/material';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#348888',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 50,
    height: 50,
    background: '#348888',
    borderRadius: '50%',
    boxShadow: '-15px 15px yellow',
    top: 0,
    right: 5,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  }
}));

export function SleepAbout() {
  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <h2>关于睡眠</h2>
          <hr style={{ border: 'none', borderTop: '1px solid black', margin: '20px 0' }} />
          <h4>
            “睡眠”助您深入了解您的睡眠习惯。睡眠跟踪和监测助您了解卧床和睡眠的时长。这些设备通过分析身体活动的变化，包含您夜间的活动，来估算您的卧床时间和睡眠时间您还可以通过手动输入自己的预估卧床时间和睡眠时间来跟踪睡眠。“卧床”时间反映您躺在床上准备入睡的时间段。对大部分人而言，它于关灯开始，起床结束。“睡眠”时间则反映您睡眠的时间段
          </h4>
        </Box>
      </CardWrapper>
    </>
  );
}
