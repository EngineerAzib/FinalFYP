export const AddNewButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={stylesAddNewButtonaddButtonContainer}>
      <View style={stylesAddNewButtonaddButton}>
        <Ionicons name="add" size={24} color="#4B6BFB" />
        <Text style={stylesAddNewButtonaddButtonText}>Add New</Text>
      </View>
    </TouchableOpacity>
  );
};