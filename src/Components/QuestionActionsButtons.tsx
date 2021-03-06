import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Button } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import DeleteConfirmation from './DeleteConfirmation'

interface Props {
  editMode: boolean
  isLoading: boolean
  onDiscard: () => void
  onEdit: (value: boolean) => void
  onDelete: () => void
  onSave: () => void
}

const QuestionActionsButtons: React.FC<Props> = ({
  onEdit,
  onDelete,
  editMode,
  isLoading,
  onDiscard,
  onSave,
}) => {
  const { isValid } = useFormikContext()
  const [showAlert, setShowAlert] = useState(false)
  const handleDeleteConfirm = () => {
    setShowAlert(false)
    onDelete()
  }

  return (
    <>
      <DeleteConfirmation
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowAlert(false)}
        show={showAlert}
      />
      <HStack>
        {editMode ? (
          <>
            <Button disabled={isLoading} variant="outline" onClick={onDiscard}>
              Discard
            </Button>
            <Button
              loadingText="Saving..."
              isLoading={isLoading}
              disabled={!isValid}
              variant="outline"
              bg="blue.100"
              onClick={onSave}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <IconButton
              disabled={isLoading}
              variant="ghost"
              aria-label="Delete Question"
              icon={<DeleteIcon />}
              onClick={() => setShowAlert(true)}
            />
            <IconButton
              disabled={isLoading}
              variant="ghost"
              aria-label="Edit Question"
              icon={<EditIcon />}
              onClick={() => onEdit(true)}
            />
          </>
        )}
      </HStack>
    </>
  )
}

export default QuestionActionsButtons
