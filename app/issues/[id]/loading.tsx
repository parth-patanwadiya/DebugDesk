import { Skeleton } from '@/app/components'
import { Box, Card, Flex } from '@radix-ui/themes'


const LoadingIssuesDetailPage = () => {
  return (
    <Box className='max-w-2xl'>
      <Skeleton />
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem"/>
      </Flex>
      <Card className='prose' mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssuesDetailPage