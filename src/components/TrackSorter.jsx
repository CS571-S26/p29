import { Form, Button, InputGroup } from 'react-bootstrap'

export default function TrackSorter({ sortField, setSortField, ascending, setAscending }) {
  return (
    <Form>
      <div className='d-flex align-items-center gap-2'>
        <Form.Label className='mb-0 text-nowrap' htmlFor='sort-field'>Sort by:</Form.Label>
        <InputGroup className='flex-nowrap'>
          <Form.Select
            id='sort-field'
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            style={{ minWidth: '126px' }}>
            <option value={"title"}>Song Title</option>
            <option value={"game"}>Game Title</option>
            <option value={"composer"}>Composer</option>
          </Form.Select>
          <Button variant='dark' onClick={() => setAscending(!ascending)}>{ascending ? '↑' : '↓'}</Button>
        </InputGroup>
      </div>
    </Form>
  )
}
