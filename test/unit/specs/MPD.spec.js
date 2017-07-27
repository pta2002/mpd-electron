import assert from 'assert'
import mpd from '@/../main/mpd.js'

describe('MPD', () => {
  describe('parseMpdResponse', () => {
    it('should return an empty object when string is empty', () => {
      assert.deepEqual({}, mpd.parseMpdResponse(''))
    })

    it('should return an empty object when string is a newline', () => {
      assert.deepEqual({}, mpd.parseMpdResponse('\n'))
    })

    it('should parse a mock mpd response with only one colon per line', () => {
      let toParse = 'Song: Hello\nAlbum: This'
      let response = {
        'Song': 'Hello',
        'Album': 'This'
      }
      assert.deepEqual(response, mpd.parseMpdResponse(toParse))
    })

    it('should parse a mock mpd response with more than one colon per line', () => {
      let toParse = 'Song: Hello :)\nAlbum: This'
      let response = {
        'Song': 'Hello :)',
        'Album': 'This'
      }
      assert.deepEqual(response, mpd.parseMpdResponse(toParse))
    })

    it('should parse a mock mpd response with no space after colon', () => {
      let toParse = 'Song:Hello\nAlbum: This'
      let response = {
        'Song': 'Hello',
        'Album': 'This'
      }
      assert.deepEqual(response, mpd.parseMpdResponse(toParse))
    })

    it('should parse an array', () => {
      let toParse = 'Album: T\nAlbum: D'
      let response = {
        'Album': ['T', 'D']
      }
      assert.deepEqual(response, mpd.parseMpdResponse(toParse))
    })
  })
})
