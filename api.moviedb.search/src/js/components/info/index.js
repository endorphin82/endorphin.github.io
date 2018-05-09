import config from '../../config'
export function infoResults(data) {
  return data.total_results;

}
export function infoResultsPages(data) {
  return data.total_pages;
}
export function infoPage(data) {
  return data.page;
}

//
// export default {
//   infoResults,
//   infoResultsPages,
//   infoPage,
// }