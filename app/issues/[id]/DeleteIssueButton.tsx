import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const DeleteIssueButton = ({ issueId } : { issueId: number }) => {
  return (
    <Button color='red'>
      <TrashIcon />
      <Link href={`/issues/${issueId}`}>
        Delete
      </Link>
    </Button>
  )
}

export default DeleteIssueButton