'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'

const DeleteIssueButton = ({ issueId } : { issueId: number }) => {
  return (
    <AlertDialog.Root>

      <AlertDialog.Trigger>
        <Button color='red'>
          <TrashIcon />
            Delete
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>

        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be reversed.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>


      </AlertDialog.Content>
      
    </AlertDialog.Root>
  );
}

export default DeleteIssueButton