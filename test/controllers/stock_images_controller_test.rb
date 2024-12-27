require "test_helper"

class StockImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get stock_images_index_url
    assert_response :success
  end

  test "should get search" do
    get stock_images_search_url
    assert_response :success
  end

  test "should get select" do
    get stock_images_select_url
    assert_response :success
  end
end
