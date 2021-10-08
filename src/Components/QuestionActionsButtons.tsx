import React from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Button } from '@chakra-ui/react'

interface Props {
  editMode: boolean
  onDiscard: () => void
  onEdit: (value: boolean) => void
  onDelete: (e: React.MouseEvent) => void
  onSave: () => void
}

const QuestionActionsButtons: React.FC<Props> = ({
  onEdit,
  onDelete,
  editMode,
  onDiscard,
  onSave,
}) => {
  return (
    <HStack>
      {editMode ? (
        <>
          <Button variant="outline" onClick={() => onDiscard()}>
            Discard
          </Button>
          <Button variant="outline" bg="blue.100" onClick={() => onSave()}>
            Save
          </Button>
        </>
      ) : (
        <>
          <IconButton
            variant="ghost"
            aria-label="Delete Question"
            icon={<DeleteIcon />}
            onClick={onDelete}
          />
          <IconButton
            variant="ghost"
            aria-label="Edit Question"
            icon={<EditIcon />}
            onClick={() => onEdit(true)}
          />
        </>
      )}
    </HStack>
  )
}

export default QuestionActionsButtons
